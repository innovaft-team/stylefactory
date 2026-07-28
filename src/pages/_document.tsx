import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";

class StyleFactoryDocument extends Document<{ locale?: string }> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            locale: ctx.locale,
        };
    }

    render() {
        return (
            <Html lang={this.props.locale ?? "en"}>
                <Head/>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default StyleFactoryDocument;
