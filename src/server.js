import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js'; 
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET="TEST_ASSESSMENT_SECRET_KEY"
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
    try {
    const newUser = await prisma.user.create({
        data: { email, password:hashedPassword, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }     
});

app.post('/signin', async (req, res) => {
   const {email,password} = req.body;
    try{
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if(user && await bcrypt.compare(password, user.password)){
        const token = jwt.sign(
            { userId: user.id, email: user.email,name: user.name },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Authentication successful',
            token,
            user: { id: user.id, email: user.email, name: user.name }
         });
            } else {
        res.status(401).json({ message: 'Invalid email or password' }); 
    }
}    catch(error){
        res.status(500).json({ error });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);
