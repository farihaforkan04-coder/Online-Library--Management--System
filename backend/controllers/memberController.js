const User = require("../models/User");

const getMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select("-password");
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.name = req.body.name || member.name;
    member.phone = req.body.phone || member.phone;
    member.isActive = req.body.isActive !== undefined ? req.body.isActive : member.isActive;

    const updatedMember = await member.save();
    res.json({
      _id: updatedMember._id,
      name: updatedMember.name,
      email: updatedMember.email,
      role: updatedMember.role,
      phone: updatedMember.phone,
      isActive: updatedMember.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMembers,
  getMemberById,
  updateMember,
};