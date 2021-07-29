import nextConnect from "next-connect";
import Newsletter from "../../../server/models/Newsletter";
import dbConnect from "../../../utils/dbConnect";

export default nextConnect()
    .get(async (req, res) => {
        const { id } = req.query;
        try {
            await dbConnect();
            if (id) {
                const news = await Newsletter.findById(id).exec();
                return res.json(news);
            }
            let AllNews = await Newsletter.find();
            return res.json(AllNews);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈",
            });
        }
    })

    .put(async (req, res) => {
        await dbConnect();
        const { id } = req.query;
        const { title, content, author, img } = req.body;
        let news = await Newsletter.findById(id).exec();
        try {
            if (title) news.title = title;
            if (content) news.content = content;
            if (author) news.author = author;
            if (img) news.img = img;
            await news.save();
            res.send("The newsletter has been modified successfully");
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈",
            });
        }
    })

    .post(async (req, res) => {
        await dbConnect();
        const { title, content, author, img } = req.body;
        try {
            if (!title || !content || !author || !img) {
                !title && req.flash("error_msg", "required title");
                !content && req.flash("error_msg", "required content");
                !author && req.flash("error_msg", "required author");
                !img && req.flash("error_msg", "required image");
                return res.send(req.flash());
            }
            const newsletter = await new Newsletter({
                title,
                content,
                author,
                img,
            });
            await newsletter.save();
            return res.send("The Newsletter was created successfully");
        } catch (error) {
            res.status(500).send({
                error_msg: "¡An error occurred on server!",
            });
        }
    })

    .delete(async (req, res) => {
        const { id } = req.query;
        try {
            await dbConnect();
            const newsletter = await Newsletter.findByIdAndDelete(id).exec();
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
