import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
}, { 
    timestamps: {createdAt: 'created_at', updatedAt:'updated_at' }


});

// Password hash
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('User', UserSchema);
export default User;
