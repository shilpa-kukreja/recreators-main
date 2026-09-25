import portfolioModel from "../models/portfolioModel.js";
import fs from "fs";
import path from "path";

/* ---------------- helpers ---------------- */
const toPublicPath = (file) => `/uploads/portfolio/${file.filename}`;

const deleteFile = (publicPath) => {
  if (!publicPath) return;
  const abs = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  fs.unlink(abs, (err) => {
    if (err) console.log("Failed to delete image:", abs, err.message);
  });
};

const getOldImages = (portfolio) => {
  if (Array.isArray(portfolio.portfolioImgs) && portfolio.portfolioImgs.length) {
    return portfolio.portfolioImgs;
  }
  return portfolio.portfolioImg ? [portfolio.portfolioImg] : [];
};

/* split req.files (from upload.any()) into groups */
const splitFiles = (files = []) => {
  const portfolioImgs = [];
  const reviewFiles = {}; // { review_<id>: publicPath }

  files.forEach((f) => {
    if (f.fieldname === "portfolioImgs") {
      portfolioImgs.push(f);
    } else if (f.fieldname.startsWith("review_")) {
      reviewFiles[f.fieldname] = toPublicPath(f);
    }
  });

  return { portfolioImgs, reviewFiles };
};

/* parse reviews JSON and merge uploaded images */
const buildReviews = (raw, reviewFiles = {}) => {
  if (!raw) return [];
  let parsed = [];
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    console.log("reviews parse error:", e.message);
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  return parsed.map((r) => ({
    clientName: (r.clientName || "").trim(),
    clientRole: (r.clientRole || "").trim(),
    reviewText: (r.reviewText || "").trim(),
    rating: Number(r.rating) || 5,
    // if a new file was uploaded under review_<id>, use it, otherwise keep existing path
    clientImg: reviewFiles[`review_${r.id}`] || r.clientImg || "",
  })).filter((r) => r.clientName && r.reviewText);
};

/* ---------------- Add ---------------- */
export const addPortfolio = async (req, res) => {
  try {
    const portfolioData = { ...req.body };
    // strip fields coming from FormData that aren't schema
    delete portfolioData.existingImages;
    delete portfolioData.portfolioImgs;
    delete portfolioData.portfolioImg;

    const { portfolioImgs, reviewFiles } = splitFiles(req.files || []);

    if (portfolioImgs.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    portfolioData.portfolioImgs = portfolioImgs.map(toPublicPath);
    portfolioData.reviews = buildReviews(req.body.reviews, reviewFiles);

    const portfolio = await portfolioModel.create(portfolioData);
    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------- Get All ---------------- */
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await portfolioModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------- Get By Id ---------------- */
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------- Update ---------------- */
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    /* ---------- portfolio images ---------- */
    const oldImages = getOldImages(portfolio);

    let keepImages = oldImages;
    if (typeof req.body.existingImages === "string") {
      try {
        const parsed = JSON.parse(req.body.existingImages);
        if (Array.isArray(parsed)) keepImages = parsed;
      } catch (e) {}
    }

    // delete removed files
    const removed = oldImages.filter((img) => !keepImages.includes(img));
    removed.forEach(deleteFile);

    const { portfolioImgs: newImgFiles, reviewFiles } = splitFiles(
      req.files || []
    );
    const newImages = newImgFiles.map(toPublicPath);

    const finalImages = [...keepImages, ...newImages];

    if (finalImages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    /* ---------- reviews ---------- */
    // old review images that got removed during editing → delete files
    const oldReviews = portfolio.reviews || [];
    const newReviews = buildReviews(req.body.reviews, reviewFiles);

    const oldReviewImgs = oldReviews.map((r) => r.clientImg).filter(Boolean);
    const newReviewImgs = newReviews.map((r) => r.clientImg).filter(Boolean);
    oldReviewImgs
      .filter((img) => !newReviewImgs.includes(img))
      .forEach(deleteFile);

    /* ---------- build update payload ---------- */
    const updateData = { ...req.body };
    delete updateData.existingImages;
    delete updateData.portfolioImgs;
    delete updateData.portfolioImg;
    delete updateData.reviews;

    updateData.portfolioImgs = finalImages;
    updateData.reviews = newReviews;
    updateData.updatedAt = new Date();

    const updatedPortfolio = await portfolioModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedPortfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------- Delete ---------------- */
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }

    getOldImages(portfolio).forEach(deleteFile);
    (portfolio.reviews || [])
      .map((r) => r.clientImg)
      .filter(Boolean)
      .forEach(deleteFile);

    await portfolioModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};