import nextConnect from 'next-connect';
import Newsletter from '../../../server/models/Newsletter';
import dbConnect from '../../../utils/dbConnect';
export default nextConnect()

.get(async (req, res)=> {
    const { _id } = req.query; 
    try{
        await dbConnect()
        if(_id){
                const news = await Newsletter.findById(_id).exec()
                return res.json(news);
            }
            let AllNews = await Newsletter.find()
            return res.json(AllNews);
    }
    catch(error){
        console.log(error);
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
    
})

.put(async (req, res)=> {
    await dbConnect()
    const {_id} = req.query;
    const { title, content, image} = req.body;
    let news = await Newsletter.findById(_id).exec();
    try {
        if(title || content || image){
            news.title = title;
            news.content = content;
            news.image = image
            await news.save()
            res.send('The newsletter has been modified successfully')
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.post(async (req, res) => {
    await dbConnect();
    const { title, content, img } = req.body;
    try {
        if (!title || !content || !img) {
            !title && req.flash("error_msg", "required title");
            !content && req.flash("error_msg", "required content");
            !img && req.flash("error_msg", "required image");
            return res.send(req.flash());
        }
        const newsletter = await new Newsletter({ title, content, img });
        await newsletter.save();
        return res.send("The Newsletter was created successfully");
    } catch (error) {
        res.status(500).send({
            error_msg: "¡An error occurred on server!",
        });
    }
})

.delete(async (req, res) => {
    const { _id } = req.query;
    try {
        await dbConnect();
        const newsletter = await Newsletter.findByIdAndDelete(_id).exec();
        if (newsletter) {
            return res.json({
                success_msg: "The Newsletter was delete successfully",
            });
        } else {
            return res.json({
                error_msg: "The Newsletter does not exist",
            });
        }
    } catch (error) {
        res.status(500).send({
            error_msg: "¡An error occurred on server!",
        });
    }
});