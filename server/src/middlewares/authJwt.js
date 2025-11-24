import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' })
  jwt.verify(token, process.env.JWT_SECRET || '123456', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
    req.user = decoded;
    console.log(req.user)

    next()
  })
}

export const isAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' })
    
        jwt.verify(token, process.env.JWT_SECRET || '123456', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
        const user = decoded;

        console.log("isAdmin " + user)
    if (user.role === 'ADMIN') return next();
    return res.status(403).json({ message: 'Require Admin Role' });

    next()
  })
};

export const isCoordinador = (req, res, next) => {
    jwt.verify(token, process.env.JWT_SECRET || '123456', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
    req.user = decoded;
    })
    
    console.log("isCoordinador " +req.user)
    if (req.user.role === 'COORDINADOR') return next();
    return res.status(403).json({ message: 'Require Coordinador Role' });
};

export const isTecnico = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' })
    
        jwt.verify(token, process.env.JWT_SECRET || '123456', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
     req.user = decoded;
    })

    console.log("isTecnico " + req.user)
    if (req.user.role === 'COORDINADOR') return next();
    return res.status(403).json({ message: 'Require Tecnico Role' });
};


// export const verifyToken = async (req, res, next) => {
//   let token = req.headers["x-access-token"];

//   if (!token) return res.status(403).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     req.userId = decoded.id;

//     const user = await User.findById(req.userId, { password: 0 });
//     if (!user) return res.status(404).json({ message: "No user found" });

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized!" });
//   }
// };

// export const isModerator = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     const roles = await Role.find({ _id: { $in: user.roles } });
//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator") {
//         next();
//         return;
//       }
//     }
//     return res.status(403).json({ message: "Require Moderator Role!" });
//   } catch (error) {
//     return res.status(500).send({ message: error });
//   }
// };

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     const roles = await Role.find({ _id: { $in: user.roles } });

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "admin") {
//         next();
//         return;
//       }
//     }

//     return res.status(403).json({ message: "Require Admin Role!" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: error });
//   }
// };