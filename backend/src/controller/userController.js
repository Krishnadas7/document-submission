import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    console.log(req.body, req.files);

    const { firstName, lastName, email, mobile, gender, documentTypes } = req.body;

    const documentTypeArray = Array.isArray(documentTypes) ? documentTypes : [documentTypes];

    let emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const documents = req.files
      ? req.files.map((file, index) => ({
          name: documentTypeArray[index] || "Unknown", 
          url: `uploads/${file.filename}`, 
        }))
      : [];

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber: mobile, 
      gender,
      documents,
    });

    await newUser.save();
    res.status(201).json({ data: newUser, message: "Account created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getUser = async (req, res) => {
    try {
        let users = await User.find();

        const updatedUsers = users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            gender: user.gender,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            documents: user.documents.map(doc => ({
                _id: doc._id,
                name: doc.name,
                url: `${req.protocol}://${req.get("host")}/${doc.url}`
            }))
        }));

        res.status(200).json({ data: updatedUsers, message: "All users list" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
