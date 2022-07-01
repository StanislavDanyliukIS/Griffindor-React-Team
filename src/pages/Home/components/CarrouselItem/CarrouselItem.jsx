import "./CarrouselItem.scss";

const CarrouselItem = ({title, subtitle, img, color, textPaddingTop}) => {

    return (
        <div className={"carrousel_item"} style={{
            backgroundImage: "url(" + img + ")",
            color: color,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
        }}>

            <h4 className={"carrousel_item-title"}
                style={{paddingTop: `${textPaddingTop}vh`}}>{title}</h4>
            <h5 className={"carrousel_item-subtitle"}>{subtitle}</h5>
        </div>
    )

}

export default CarrouselItem;