import Category from '../../../server/models/Category'

export default async (req, res) => {
    const { title } = req.body;
    if (title) {
        const newCategory = await new Category({title});
        await newCategory.save();
        return res.json({ success_msg: 'Categoría agregada con éxito'})
    }
    return res.send('Title is required')
}