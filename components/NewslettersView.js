import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewsletter } from "../store/actions/newsletterActions";
import Newsletter from './Newsletter'
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";

const CardsContainer = styled.main`
    grid-area: main;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 16px;
    @media (max-width: 900px) {
        justify-content: center;
        margin-left: 0px;
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const NewslettersView = () => {
    const dispatch = useDispatch();
    const newsletters = useSelector((state) => state.newsletter.newsletters);

    useEffect(() => {
        dispatch(getNewsletter());
    }, [dispatch]);

    if (newsletters === undefined) {
        return (
            <LoaderContainer>
                <PacmanLoader color={"#000"} size={40} />
            </LoaderContainer>
        )
    }

    return (
        <div>
            <CardsContainer>
                {newsletters.length > 0 ? (
                    newsletters.map((news) => (
                        <Newsletter
                            key={news._id}
                            id={news._id}
                            title={news.title}
                            content={news.content}
                            author={news.author}
                            img={news.img}
                        />
                    ))
                ) : (
                    <h2>¡En este momento no hay noticias, vuelve más tarde!</h2>
                )}
            </CardsContainer>
        </div>
    );
};

export default NewslettersView;
