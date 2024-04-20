import Head from 'next/head';

interface SeoHeadProps {
    title: string
    description: string
    imagePath: string
}

const SeoHead = ({title, description, imagePath}: SeoHeadProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} key="desc"/>
            <meta property="og:title" content={title}/>
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:image"
                content={imagePath}
            />
        </Head>
    )
}

export default SeoHead