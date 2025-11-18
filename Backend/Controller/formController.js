const Form = require("../Model/formModel");

const getData = async (req,res)=>{
  const data = await Form.find().sort({ createdAt: -1 });
   res.json(data);
   
}

const createform = async (req,res) =>{
  try {
        const { name, email, message, rating } = req.body;

        if (!name || !email || !message || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // res.send(name);
        const feedback = new Form({
          name:name,
          email:email,
          message:message,
          rating:rating
        })

       const result = await feedback.save();
      //  console.log(result);
      res.send(result)
       
        
  } catch (error) {
    console.log(error);
      if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);

      return res.status(400).json({
        success: false,
        errors: messages,
      });
    }
  }
    
}

const deletefeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Form.deleteOne({ _id: id });

    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ success: true, message: "Feedback deleted successfully" });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {createform,getData,deletefeedback} ; 
