import Container from "../../components/Container";
import NewslettersDetail from "../../components/NewslettersDetail";
import axios from "axios";

const NewsletterDetail = ({ newsletterData }) => {
  return (
    <>
      <Container>
        <NewslettersDetail newsletterData={newsletterData} />
      </Container>
    </>
  );
};

export default NewsletterDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { newsletterDetail } = params;
  const ABSOLUTE_URL = process.env.ABSOLUTE_URL;

  const callNewsletterData = await axios.get(
    `${ABSOLUTE_URL}/api/newsletter?id=${newsletterDetail}`
  );
  const newsletterData = callNewsletterData.data;
  return {
    props: { newsletterData },
  };
}
