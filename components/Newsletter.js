import Link from "next/link";
import { useDispatch } from "react-redux";
import { getNewsletterDetail } from "../store/actions/newsletterActions";
import styled from "styled-components";
import { StyledLink } from "./globalStyle";

const CardContainer = styled.div`
    transition: all 0.2s ease-out;
    border: 1px solid ${(props) => props.theme.colorLevel4};
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 280px;
    height: 400px;
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

const ImageContainer = styled.div`
    background-image: url(${(props) => props.imgUrl});
    background-position: center;
    backdrop-filter: brightness(1.5);
    background-size: cover;
    cursor: pointer;
    border-bottom: 1px solid grey;
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
`;

const ContainerDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10%;
    margin-bottom: 5%;
    width: 100%;
    height: 40%;
`;

const newsletterImage = styled.img`
    height: 100%;
    max-width: 100%;
`;

const CardNewsletterTitle = styled.h4`
    ${"" /* font-size:1.2rem; */}
    margin-top: 10px;
    cursor: pointer;
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

const DontMove = styled.div`
    position: relative;
`;

const Newsletter = ({ id, title, content, author, img }) => {
    const dispatch = useDispatch();

    return (
        <>
            <CardContainer>
                <Link
                    href={"/[newsletterDetail]"}
                    as={`/detail/${id}`}
                    passHref
                >
                    <ImageContainer imgUrl={img}>
                        <newsletterImage src={img}></newsletterImage>
                    </ImageContainer>
                </Link>
                <ContainerDetail>
                    <Link
                        href={"/[newsletterDetail]"}
                        as={`/detail/${id}`}
                        passHref
                    >
                        <div>
                            <CardNewsletterTitle> {title} </CardNewsletterTitle>
                        </div>
                    </Link>
                    <DontMove>
                        <Link
                            href={"/[newsletterDetail]"}
                            as={`/detail/${id}`}
                            passHref
                        >
                            <StyledButton
                                onClick={() =>
                                    dispatch(getNewsletterDetail(id))
                                }
                            >
                                Leer completa{" "}
                            </StyledButton>
                        </Link>
                        <ArrowSpan>→</ArrowSpan>
                    </DontMove>
                </ContainerDetail>
            </CardContainer>
        </>
    );
};

export default Newsletter;
