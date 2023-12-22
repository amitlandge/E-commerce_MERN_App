const Contact = require("../model/contactSchema");
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      contactEmail: req.body.email,
    });
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.createContact = createContact;
