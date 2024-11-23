const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 8888;

app.use(cors());

app.use(bodyParser.json());
const SECRET_KEY = "seblakcekersquad";

const tokenAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied! Token Not Found");
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid Token");
    }

    req.user = user;
    next();
  });
};

// ========== LOGIN ==========
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.get("http://localhost:3000/users");
    const users = response.data;
    const user = users.find(
      (data) => data.email === email && data.password === password
    );
    if (user) {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1d",
      });
      res.send({
        message: "Login Success!",
        id: user.id,
        role: user.role,
        token: token,
      });
    }
  } catch (error) {
    res.send("error");
  }
});
// ========== END LOGIN ==========

// ========== REGISTER ==========
app.post("/register", async (req, res) => {
  const { name, email, password, image, role } = req.body;
  const newUser = {
    name,
    email,
    password,
    image,
    role,
  };
  try {
    const response = await axios.post("http://localhost:3000/users", newUser);
    res.status(200).send({ message: "Register Success!", data: response.data });
  } catch (error) {
    res.send("error");
  }
});
// ========== END REGISTER ==========

// ========== GET USER ==========
app.get("/users/:id", tokenAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});
// ========== END GET USER ==========

// ========== EDIT USER ==========

app.put("/edit-user/:id", tokenAuth, async (req, res) => {
  const id = req.params.id;
  const { name, email, telp } = req.body;

  const updateUser = { name, email, telp };

  try {
    const response = await axios.patch(
      `http://localhost:3000/users/${id}`, // pastikan URL endpoint benar
      updateUser
    );

    res.status(200).send({ message: "Sukses, terdaftar", data: response.data });
  } catch (err) {
    res.status(err.response?.status || 500).send({
      message: "Error updating user",
      error: err.response?.data || err.message,
    });
  }
});

// ========== END EDIT USER ==========

// ========== DELETE USER ==========
app.delete("/users/:id", tokenAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);
    res.status(200).send({ data: response.data });
  } catch (err) {
    if (err.response) {
      console.error("Response error:", err.response.data);
      console.error("Response status:", err.response.status);
      res.status(err.response.status).json({
        error: "Terjadi kesalahan saat registrasi.",
        details: err.response.data,
      });
    } else if (err.request) {
      console.error("Request error:", err.request);
      res.status(500).json({ error: "Tidak ada respon dari server." });
    } else {
      console.error("Error message:", err.message);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam menghubungi server." });
    }
  }
});
// ========== END DELETE USER ==========

// =========== GET PROJECTS ==========
app.get("/projects", async (req, res) => {
  const response = await axios.get(`http://localhost:3000/projects`);
  res.send(response.data);
});
// ========== END GET PROJECTS

// ========== GET COMPANY PROJECTS ==========
app.get("/company-projects/:id", tokenAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `http://localhost:3000/projects?idcompany=${id}`
    );
    res.send(response.data);
  } catch (error) {
    res.send("error");
  }
});
// ========== END GET COMPANY PROJECTS ==========

// ========== POST PROJECTS ==========
app.post("/projects", tokenAuth, async (req, res) => {
  const { idcompany, companyname, name, description, image } = req.body;
  const newProject = {
    idcompany,
    companyname,
    name,
    description,
    image,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/projects",
      newProject
    );
    res.status(200).send({ message: "success", data: response.data });
  } catch (error) {
    res.send("error");
  }
});
// ========== END POST PROJECTS ==========

// ========== UPDATE PROJECT ==========
app.put("/projects/:id", tokenAuth, async (req, res) => {
  const id = req.params.id;
  const { idcompany, name, companyname, description } = req.body;
  const updateProject = {
    idcompany,
    name,
    companyname,
    description,
  };
  if (
    !(
      updateProject.idcompany &&
      updateProject.companyname &&
      updateProject.name &&
      updateProject.description
    )
  ) {
    return res.status(400).send({ message: "Please fill in all fields" });
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/projects/${id}`,
      updateProject
    );
    res.status(200).send({ message: "Sukses, terdaftar", data: response.data });
  } catch (err) {
    res.send("error" + err);
  }
});
// ========== END UPDATE PROJECT ==========

// ========== DELETE PROJECT ==========
app.delete("/projects/:id", tokenAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`http://localhost:3000/projects/${id}`);
    res.status(200).send({ data: response.data });
  } catch (err) {
    if (err.response) {
      console.error("Response error:", err.response.data);
      console.error("Response status:", err.response.status);
      res.status(err.response.status).json({
        error: "Terjadi kesalahan saat registrasi.",
        details: err.response.data,
      });
    } else if (err.request) {
      console.error("Request error:", err.request);
      res.status(500).json({ error: "Tidak ada respon dari server." });
    } else {
      console.error("Error message:", err.message);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam menghubungi server." });
    }
  }
});
// ========== END DELETE PROJECT ==========

// ========== GET STUDENT DETAIL PROJECTS ==========

app.get("/student-projects/:studentId", tokenAuth, async (req, res) => {
  const { studentId } = req.params;
  try {
    const projectDetails = await axios.get(
      "http://localhost:3000/projectDetails"
    );
    const projects = await axios.get("http://localhost:3000/projects");
    const companies = await axios.get("http://localhost:3000/users");

    // Filter project detail sesuai studentId
    const studentProjects = projectDetails.data.filter(
      (detail) => detail.idstudent === studentId
    );

    // Map project details dan tambahkan nama perusahaan
    const result = studentProjects.map((detail) => {
      const project = projects.data.find(
        (proj) => proj.id === detail.idproject
      );
      const company = companies.data.find(
        (user) => user.id === detail.idcompany
      );

      return {
        ...detail,
        projectname: project ? project.name : detail.projectname,
        companyname: company ? company.name : "Unknown Company",
      };
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching project details for student" });
  }
});
// ========== END GET STUDENT DETAIL PROJECTS ==========

// ========== END GET COMPANY DETAIL PROJECTS ==========
app.get("/projectdetails/company/:companyId", tokenAuth, async (req, res) => {
  const { companyId } = req.params;
  try {
    const projectDetails = await axios.get(
      "http://localhost:3000/projectDetails"
    );
    const projects = await axios.get("http://localhost:3000/projects");
    const students = await axios.get("http://localhost:3000/users");

    // Filter project detail sesuai companyId
    const companyProjects = projectDetails.data.filter(
      (detail) => detail.idcompany === companyId
    );

    // Map project details dan tambahkan nama siswa
    const result = companyProjects.map((detail) => {
      const project = projects.data.find(
        (proj) => proj.id === detail.idproject
      );
      const student = students.data.find(
        (user) => user.id === detail.idstudent
      );

      return {
        ...detail,
        projectname: project ? project.name : detail.projectname,
        studentname: student ? student.name : "Unknown Student",
      };
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching project details for company" });
  }
});

// ========== SUBMIT PROJECT ==========
app.post("/projectdetails", async (req, res) => {
  const { idproject, idstudent, link } = req.body;

  try {
    const projects = await axios.get("http://localhost:3000/projects");
    const users = await axios.get("http://localhost:3000/users");

    const project = projects.data.find((proj) => proj.id === idproject);
    const student = users.data.find((user) => user.id === idstudent);
    const company = users.data.find((user) => user.id === project?.idcompany);

    console.log("Project:", project);
    console.log("Student:", student);
    console.log("Company:", company);

    if (!project || !student || !company) {
      return res.status(400).json({ error: "Invalid project or user details" });
    }

    const newProjectDetail = {
      id: `pd${Math.floor(Math.random() * 10000)}`,
      idproject: project.id,
      projectname: project.name,
      idcompany: company.id,
      companyname: company.name,
      idstudent: student.id,
      studentname: student.name,
      link,
      status: "Waiting to review",
      feedback: "",
      date: new Date().toISOString().split("T")[0],
    };

    await axios.post("http://localhost:3000/projectDetails", newProjectDetail);

    res.status(201).json({
      message: "Project detail submitted successfully",
      data: newProjectDetail,
    });
  } catch (error) {
    res.status(500).json({ error: "Error submitting project detail" });
  }
});
// ========== END SUBMIT PROJECT ==========

// ========== FEEDBACK ==========
app.put("/feedback/:id", tokenAuth, async (req, res) => {
  const id = req.params.id;
  const feedback = req.body;
  const status = "Done"
 
  try {
    await axios.patch(`http://localhost:3000/projectDetails/${id}`, feedback, status);
    res.send("status berhasil dirubah");
  } catch (err) {
    res.send("error" + err);
  }
});
// ========== END FEEDBACK ==========

// app.put("/status/:id", tokenAuth, async (req, res) => {
//   const id = req.params.id;
//   const status = req.body;
//   try {
//     await axios.patch(`http://localhost:3000/projectDetails/${id}`, status);
//     res.send("status berhasil dirubah");
//   } catch (err) {
//     res.send("error" + err);
//   }
// });

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
