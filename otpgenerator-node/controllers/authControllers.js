import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { GenerateOtp } from '../utils/GenerateOtp.js'
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../utils/sendOtp.js'

//send otp
export const sendOtp = async(req,res)=>{
   const { email } =  req.body;

   let user = await User.findOne({email});
   if(!user){
      user = await User.create({ email })
   }
   
   const otp = GenerateOtp();
   const hashedOtp = await bcrypt.hash(otp,10);
   user.otp = hashedOtp;
   user.otpExpires = Date.now() + 2 * 60 * 1000;
   await user.save();
   await sendOtpEmail(email, otp);

  res.json({ message: "OTP sent successfully" });

}
// ✅ 2. Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otpExpires < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Verified successfully", token });
};

// ✅ 3. Protected Route Example
export const protectedData = (req, res) => {
  res.json({ message: "You accessed protected data ✅" });
};
