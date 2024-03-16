const mongoose = require('mongoose');

// Check if password is provided as command-line argument
if (process.argv.length < 3) {
  console.log('Please provide the MongoDB password as a command-line argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://gbengaoluwadahunsi:${password}@mern-backend.dpy5wko.mongodb.net/?retryWrites=true&w=majority&appName=MERN-BACKEND`;
mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Define Note Schema and Model
    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });
    noteSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        } })
    
    const Note = mongoose.model('Note', noteSchema);
  
      

    // Perform database operations
    Note.find({})
      .then(notes => {
        console.log('Notes:', notes);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      })
      .finally(() => {
        // Close the database connection after operations are completed
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

  //We could restrict our search to only include important notes like this:
  Note.find({ important: true }).then(result => {
  // ...
})
