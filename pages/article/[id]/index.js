import Link from 'next/link'
import Meta from '../../../components/Meta'
import articleStyles from '../../../styles/Article.module.css';


const article = ({article}) => {
    return(
        <>
            <Meta title={article.name} description={article.email}/>
            <div className = {articleStyles.grid}>
                <div className = {articleStyles.card}>
                    <h1>{article.name}</h1>
                    <p>{article.email}</p>
                    <br />
                </div> 
            </div>
            <Link href='/'><a style = {{color: 'blue'}} >Go Back</a></Link>
        </>
    );
}

export const getStaticProps = async (context) =>{
    const id = context.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
    const article = await res.json();
    return {
        props: {
            article,
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const articles = await res.json();

    const ids = articles.map((article) => article.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() }}))

    return {
        paths,
        fallback:  false,
    }
}

export default article
