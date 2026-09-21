import contactModel from "../models/contactModel.js";



export const contactMessage = async (req, res) => {
    try {
        const { name, email, number, subject, message } = req.body;
        const contact = new contactModel({ name, email, number, subject, message });
        await contact.save();
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getContactMessages = async (req, res) => {
    try {
        const messages = await contactModel.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const removeContactMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await contactModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}