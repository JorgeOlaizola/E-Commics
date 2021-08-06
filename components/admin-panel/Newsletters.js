import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";
import {
  Input,
  GradientBorder,
  DisableBorder,
  InputDisable,
  EraseButton,
} from "../globalStyle";
import {
  addNewsletter,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
  getNewsletterDetail
} from "../../store/actions/newsletterActions.js";

const DivContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  font-weight: bold;
  & label,
  a,
  summary {
    font-weight: normal;
  }
`;
const DivFormItem = styled.div`
  margin: 0.2rem;
  padding: 0.5rem;
`;
const FormContainer = styled.form`
  width: 400px;
  margin: auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 1rem;
  @media (max-width: 420px){
    width: 100%;
    ${'' /* max-width: 280px; */}
    padding: 0rem;
    }
`;
const FormFieldset = styled.fieldset`
  border: 2px solid #80808021;
  padding: 1rem;
`;
const FormInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #80808059;
  font-size: 1rem;
  margin-top: 0.2rem;
`;
const FormTextArea = styled.textarea`
width:100%;
height: 4rem;
border : none;
border-bottom: 1px solid #80808059;
font-size:1rem;
margin-top: 0.2rem;
font-family: roboto;
`
const ImageInput = styled.input`
  display: none;
`;
const ImageLabel = styled.label`
background: none;
color: ${(props) => props.theme.fontColor};
border: 1px solid ${(props) => props.theme.blueColorHover};
cursor: pointer;
font-size: 0.75rem;
font-family: ubuntu;
font-weight: 300;
padding: 6px;
margin: 20px 5px 0px 5px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
`

const StyledImage = styled.img`
  width: 100%;
`;

const Space = styled.div`
  height: 100px;
`;

const UsersButton = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
`

const UsersButtonDelete = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.redColorHover};
    }
`

const Newsletters = () => {
  const dispatch = useDispatch();
  const [imageSelected, setImageSelected] = useState("");
  const [loading, setLoading] = useState(false); 
  const [input, setInput] = useState({
    title: "",
    content: "",
    author: "",
    img : ""
  })

  const newsletters = useSelector(state => state.newsletter.newsletters)
  const news = useSelector(state => state.newsletter.newsletter)
  
  const [update, setUpdate] = useState({
    title: '',
    content: '',
    author: '',
  })
  
  
  const router = useRouter();

  useEffect(
    () => {
        dispatch(getNewsletter())
    }, [])

  function handleChange(e) {
    if (e.target.value < 0) {
      setInput({ ...input });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  }
  const keyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (imageSelected) {
      const fromData = new FormData();
      fromData.append("file", imageSelected);
      fromData.append("upload_preset", process.env.CLOUDINARY_PRESET);
      axios
        .post(process.env.CLOUDINARY_URL, fromData)
        .then((resp) => {
          let respuesta = {
            ...input,
            img: resp.data.secure_url,
          };
          return axios.post("/api/newsletter/", respuesta);
        })
        .then(function (response) {
          response.data.error_msg && alert(response.data.error_msg);
          response.data;
          alert('NewsLetter created succesfully')
          setImageSelected('')
          setInput({
            title: "",
            content: "",
            author: "",
            img: "",
          })
          dispatch(getNewsletter())
          setLoading(false);

        })
        .catch((error) => console.error(error));
    }
  };

  const GuardarImage = (e) => {
    e.preventDefault();
    setImageSelected(e.target.files[0]);
  };
  const mostrar = () => {
    const objectURL = URL.createObjectURL(imageSelected);
    return objectURL;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(updateNewsletter(news._id, update))
    setUpdate({
      title: "",
      content: "",
      author: "",
    })
    setTimeout(() => dispatch(getNewsletter()),1000)
    news.title = undefined
    setLoading(false)
  }
  
  const handleChangeUpdate = (e) => {
      setUpdate({
        ...update,
        [e.target.name]: e.target.value,
      });
    
  }

  const newDelete =  async (id) => {
    await dispatch(deleteNewsletter(id))
    await dispatch(getNewsletter())
  }  

  return (
    <>
      <h2>Publicar noticia</h2>
      {
       !news.title ? !loading ? (
        <DivContainer>
          <FormContainer
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormFieldset>
              <DivFormItem>
                <label htmlFor="inputTitle">Título</label>
                <br />
                <FormInput
                  onKeyDown={keyEnter}
                  id="inputTitle"
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                <label htmlFor="inputContent">Contenido</label>
                <br />
                <FormTextArea
                  onKeyDown={keyEnter}
                  id="inputContent"
                  name="content"
                  value={input.content}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                <label htmlFor="inputAuthor">Autor</label>
                <br />
                <FormInput
                  onKeyDown={keyEnter}
                  id="inputAuthor"
                  type="text"
                  name="author"
                  value={input.author}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                {imageSelected && (
                  <StyledImage key={mostrar()} src={mostrar()} />
                )}
              </DivFormItem>
              <DivFormItem>
                <ImageLabel htmlFor="file-upload">Cargar imagen</ImageLabel>
                <ImageInput 
                  type="file"
                  id="file-upload"
                  accept="image/png,image/jpeg,image/png"
                  onChange={(e) => {
                    GuardarImage(e)
                  }}
                />
              </DivFormItem>
            </FormFieldset>
            {!input.title || !input.content || !input.author ? (
              <DisableBorder>
                <InputDisable>Publicar</InputDisable>
              </DisableBorder>
            ) : (
              <GradientBorder>
                <Input type="submit">Publicar</Input>
              </GradientBorder>
            )}
          </FormContainer>
        </DivContainer>
      ) : (
        <DivContainer>
          <Space />
          <PacmanLoader color={"#000"} size={30} />
        </DivContainer>
      ): (
        <DivContainer>
          <h2>Publicar noticia</h2>
          <FormContainer
            onSubmit={(e) => {
              handleUpdate(e)
            }}
          >
            <FormFieldset>
              
              <DivFormItem>
                <label htmlFor="inputTitle">Título</label>
                <br />
                <FormInput
                  onKeyDown={keyEnter}
                  id="inputTitle"
                  type="text"
                  name="title"
                  maxLength="50"
                  value={update.title}
                  onChange={(e) => {
                    handleChangeUpdate(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                <label htmlFor="inputContent">Contenido</label>
                <br />
                <FormInput
                  onKeyDown={keyEnter}
                  id="inputContent"
                  name="content"
                  maxLength="400"
                  value={update.content}
                  onChange={(e) => {
                    handleChangeUpdate(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                <label htmlFor="inputAuthor">Autor</label>
                <br />
                <FormInput
                  onKeyDown={keyEnter}
                  id="inputAuthor"
                  type="text"
                  name="author"
                  value={update.author}
                  onChange={(e) => {
                    handleChangeUpdate(e);
                  }}
                />
              </DivFormItem>
              <DivFormItem>
                {imageSelected && (
                  <StyledImage key={mostrar()} src={mostrar()} />
                )}
              </DivFormItem>
              
            </FormFieldset>
            {
              <GradientBorder>
                <Input type="submit">Guardar Cambios</Input>
              </GradientBorder>
            }
          </FormContainer>
        </DivContainer>
      )}
      <h2>Noticias publicadas</h2>
     {
     newsletters?.length > 0 ? newsletters.map(c =>{ 
      return  <NewsList key={c._id}>
                <p><strong>Título:</strong> {c.title}</p> 
                <p><strong>Id:</strong> {c._id} </p>
                <div>
                  <UsersButtonDelete style={{marginRight: "10px"}} onClick={() => {
                    newDelete(c._id)
                  }}>Delete</UsersButtonDelete> 
                  <UsersButton onClick={() => {
                    dispatch(getNewsletterDetail(c._id))
                  }}>Update</UsersButton>
                </div>
              </NewsList>}) 
             : <span>No hay noticias</span>
    } 
    </>
  );
};

export default Newsletters;

const NewsList = styled.div`
display: flex;
flex-direction: column;
max-width: 360px;
justify-content: flex-start;
align-items: flex-start;
${'' /* flex-wrap: wrap; */}
margin: 8px 16px;
`