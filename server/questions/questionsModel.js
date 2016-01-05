var mongoose= require('mongoose'); 

var QuestionsSchema = new mongoose.Schema({
 optionA: String,
 optionB: String,
}); 

module.exports = mongoose.model('Questions', QuestionsSchema);