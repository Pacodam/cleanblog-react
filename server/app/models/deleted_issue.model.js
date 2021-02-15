module.exports = (mongoose) => {
    const Deleted_Issue = mongoose.model(
      "deleted_issue",
      mongoose.Schema({
        id: String,
        status: String,
        owner: String,
        created: Date,
        effort: Number,
        due: Date,
        title: String,
        description: String,
        deleted: Date,
      })
    );
    return Deleted_Issue;
  };