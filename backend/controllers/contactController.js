const ContactModel = require('../models/contactModel');

const ContactController = {
  sendMessage: async (req, res) => {
    try {
      const { full_name, email, subject, message } = req.body;

      if (!full_name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      await ContactModel.create({ full_name, email, subject, message });

      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  },

  getMessages: async (req, res) => {
    try {
      const messages = await ContactModel.getAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  }
};

module.exports = ContactController;
