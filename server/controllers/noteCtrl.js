const Notes=require("../models/noteModel");

const noteCtrl ={
    getNotes: async (req,res)=>{
        try {
            // res.json({user_id:req.user.id});
            const notes = await Notes.find({user_id:req.user.id});
            res.json(notes);
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    createNotes: async (req,res)=>{
        try {
            const {title,content,date}=req.body;  
            const newNote =new Notes({
                title,
                content,
                date,
                user_id:req.user.id,
                name:req.user.name,

            })
            // it is creating and saving the newnote into the notes database
            await newNote.save();
            res.json({msg:"created a note successfully"})
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    deleteNotes: async (req,res)=>{
        try {
            await Notes.findByIdAndDelete(req.params.id);
            res.json({msg:"deleted note successfully"})
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    updateNotes: async (req,res)=>{
        try {
            const {title,content,date}=req.body;
            await Notes.findOneAndUpdate({_id:req.params.id},{
                title,
                content,
                date
            })
            res.json({msg:"updated a note"})
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    getNote: async (req,res)=>{
        try {
            const note=await Notes.findById(req.params.id);
            res.json(note);
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    }
}

module.exports=noteCtrl;
