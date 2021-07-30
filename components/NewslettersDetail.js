import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewsletter } from "../store/actions/newsletterActions";
import Newsletter from "./Newsletter";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {
    StyledLink,
    Input,
    GradientBorder,
    BuyButton,
    EraseButton,
} from "./globalStyle";
import { showModalAlert } from "../store/actions/modalAlertActions";

const Father = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    @media (max-width: 900px) {
    }
`;

const DetailContainer = styled.div`
    width: 90%;
    height: 90%;
    background: ${(props) => props.theme.backgroundLevel1};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
`;

const ImageContainer = styled.div`
    width: 66%;
    min-width: 280px;
    height: 100%;
`;

const ImageView = styled.div`
    display: flex;
    justify-content: center;
`;

const InfoContainer = styled.div`
    width: 33%;
    min-width: 280px;
    height: 90%;
    padding-left: 20px;
    @media (max-width: 914px) {
        width: 100%;
        padding: 0 16px;
    }
`;

const Title = styled.h1`
    ${"" /* font-size: 2rem; */}
    ${"" /* font-weight: bold; */}
    margin-bottom: 30px;
    @media (max-width: 914px) {
        ${"" /* display: none; */}
    }
`;

const SubTitle = styled.h3`
    ${"" /* font-size: 2rem; */}
    ${"" /* font-weight: bold; */}
    margin-bottom: 20px;
    @media (max-width: 914px) {
        ${"" /* display: none; */}
    }
`;

const ResponsiveTitle = styled.h1`
    ${"" /* font-size: 2rem; */}
    ${"" /* font-weight: bold; */}
    margin: 30px 0;
    display: none;
    @media (max-width: 914px) {
        display: block;
    }
`;

const Description = styled.p`
    margin-bottom: 20px;
    color: ${(props) => props.theme.colorLevel2};
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    margin-top: 20px;
    background-color: ${(props) => props.theme.blueColor};
`;

const DivLine = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colorLevel3};
    z-index: 9;
    margin-bottom: 10px;
`;

const ImageNewsletter = styled.img`
    margin: 0.5rem;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 10px;
    @media (max-width: 900px) {
        justify-content: center;
        margin-left: 0px;
    }
`;

const CardContainer = styled.div`
    transition: all 0.2s ease-out;
    border: 1px solid ${(props) => props.theme.colorLevel4};
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    width: 260px;
    height: 150px;
    ${"" /* box-shadow: 0 0 11px rgba(33,33,33,.2); */}
    &:hover {
        box-shadow: 0 0 20px rgba(33, 33, 33, 0.2);
        ${"" /* transform: scale(1.1); */}
        background: ${(props) => props.theme.backgroundLevel2}
    }
    @media (max-width: 320px) {
        margin: 0.6rem 0;
    }
`;

const StyledButton = styled(StyledLink)`
    margin-bottom: 5px;
    color: #ff0000;
    display: inline;
    padding-right: 2px;
    transition: 0.2s;

    &:hover {
        color: #e10000;
        padding-right: 7px;
        transition: 0.2s;
    }
`;

const ArrowSpan = styled.span`
    display: inline;
    padding-left: 2px;
    transition: 0.2s;
    color: #ff0000;
    &:hover {
        padding-left: 7px;
        transition: 0.2s;
    }
`;

const CardNewsletterTitle = styled.h4`
    ${"" /* font-size:1.2rem; */}
    margin-top: 10px;
    cursor: pointer;
`;

const CardNewsletterSubTitle = styled.h6`
    ${"" /* font-size:1.2rem; */}
    margin-top: 0px;
`;

const DontMove = styled.div`
    position: relative;
`;

const NewslettersDetail = ({ newsletterData }) => {
    const dispatch = useDispatch();
    const newsletters = useSelector((state) => state.newsletter.newsletters);

    useEffect(() => {
        dispatch(getNewsletter());
    }, [dispatch]);

    return (
        <Father>
            <DetailContainer>
                <ImageInfo>
                    <ImageContainer>
                        <Link passHref href="/newsletters">
                            <StyledLink>← noticias</StyledLink>
                        </Link>
                        <ResponsiveTitle>
                            {newsletterData.title}
                        </ResponsiveTitle>
                        <ImageView>
                            <ImageNewsletter
                                src={newsletterData.img}
                                alt={newsletterData.img}
                            />
                        </ImageView>
                    </ImageContainer>
                    <InfoContainer>
                        {<DivLine></DivLine>}
                        <Title>{newsletterData.title}</Title>
                        <Description>
                            <strong>Autor: </strong>
                            {newsletterData.author}
                        </Description>
                        <Description>{newsletterData.content}</Description>
                    </InfoContainer>
                    <Separator />
                    <SubTitle>Otras noticias de interés</SubTitle>
                    <CardsContainer>
                        {newsletters?.length > 0 ? (
                            newsletters.slice(0, 3).map((news) => (
                                <CardContainer>
                                    <Link
                                        href={"/newsletters/[newsletterDetail]"}
                                        as={`/newsletters/${news.id}`}
                                        passHref
                                    >
                                        <div>
                                            <CardNewsletterTitle> {news.title} </CardNewsletterTitle>
                                        </div>
                                    </Link>
                                    <div>
                                        <CardNewsletterSubTitle>
                                            {" "}
                                            Autor: {news.author}{" "}
                                        </CardNewsletterSubTitle>
                                    </div>
                                    <DontMove>
                                        <Link
                                            href={"/newsletters/[newsletterDetail]"}
                                            as={`/newsletters/${news.id}`}
                                            passHref
                                        >
                                            <StyledButton>Leer completa</StyledButton>
                                        </Link>
                                        <ArrowSpan>→</ArrowSpan>
                                    </DontMove>
                                </CardContainer>
                            ))
                        ) : (
                            <h2>¡En este momento no hay más noticias!</h2>
                        )}
                    </CardsContainer>
                </ImageInfo>
            </DetailContainer>
        </Father>
    );
};

export default NewslettersDetail;
