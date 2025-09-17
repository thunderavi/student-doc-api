const { Document, User, sequelize } = require("../models");

// Upload Document
exports.uploadDocument = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, title, url } = req.body;

    if (!userId || !title || !url) {
      await transaction.rollback();
      return res.status(400).json({ message: "userId, title, and url are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const document = await Document.create({ userId, title, url }, { transaction });
    await transaction.commit();
    return res.status(201).json(document);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

// List User Documents (only non-deleted)
exports.listUserDocuments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const documents = await Document.findAll({
      where: { userId: id, isDeleted: false },
    });

    return res.status(200).json(documents);
  } catch (err) {
    next(err);
  }
};

// Soft Delete Document
exports.softDeleteDocument = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);
    if (!document) {
      await transaction.rollback();
      return res.status(404).json({ message: "Document not found" });
    }

    await document.update({ isDeleted: true }, { transaction });
    await transaction.commit();

    return res.status(200).json({ message: "Document soft deleted" });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

// Restore Document
exports.restoreDocument = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);
    if (!document) {
      await transaction.rollback();
      return res.status(404).json({ message: "Document not found" });
    }

    await document.update({ isDeleted: false }, { transaction });
    await transaction.commit();

    return res.status(200).json({ message: "Document restored" });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
