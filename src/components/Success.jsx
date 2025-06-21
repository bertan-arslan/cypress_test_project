import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function Success() {
    return (
        <Card>
            <img  
                src="https://smb.ibsrv.net/imageresizer/image/blog_images/1200x1200/10087/91160/0447463001544828845.jpg" 
                alt="Kayıt başarılı"
                style={{ width: "65%", display: "block", margin: "0 auto" }} 
            />
            <CardBody>
                <CardTitle tag="h5">
                Tebrikler!
                </CardTitle>
                <CardText>
                Kayıt işleminiz başarıyla tamamlanmıştır
                </CardText>
            </CardBody>
        </Card>
    )
}