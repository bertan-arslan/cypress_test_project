import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody, FormFeedback, CardFooter } from 'reactstrap';
import axios from "axios";


const formInitial = {
  email: "",
  password: "",
  terms: false
}

export default function Login() {

  const history = useHistory();
  const [formData, setFormData] = useState(formInitial);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false
  });

  const[isValid, setIsValid] = useState(false);

  const errorMessages = {
    email: "Geçerli bir eposta adresi girin.",
    password: "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol(!@#$%^&*) ve en az 1 rakam içermelidir.",
    terms: "KVKK metnini kabul etmeniz gerekmektedir."
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: newValue });

    if (name === "email") {
      setErrors({ ...errors, email: !validateEmail(newValue) });
    }

    if (name === "password") {
      setErrors({ ...errors, password: !validatePassword(newValue) });
    }

    if (name === "terms") {
      setErrors({ ...errors, terms: !newValue });
    }
};


  useEffect(() => {
    if(validateEmail(formData.email)
      && validatePassword(formData.password) 
      && formData.terms){
        setIsValid(true);
      } else {
        setIsValid(false);
      }
  }, [formData])


const handleSubmit = (event) => {
  event.preventDefault();
  if (!isValid) return;

  const { email, password } = formData;

  axios.post(
    "https://reqres.in/api/users", 
    { email, password },
    { headers: { "x-api-key": "reqres-free-v1" } }
  )
  .then(response => {
    history.push("/success");
    setFormData(formInitial);
  })
  .catch(error => {
    console.warn(error);
  });
}

  return (
    <Card>
      <CardTitle tag="h5">
      Kayıt ol
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">
              Eposta:
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Eposta adresinizi giriniz"
              type="email"
              onChange = {handleChange}
              value={formData.email}
              invalid={errors.email}
              data-cy="email"
            />
            {errors.email && <FormFeedback data-cy="errorEmail">{errorMessages.email}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Şifre:
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Güçlü bir şifre seçiniz"
              type="password"
              onChange = {handleChange}
              value={formData.password}
              invalid={errors.password}
              data-cy="password"
            />
            {errors.password && <FormFeedback data-cy="errorPassword">{errorMessages.password}</FormFeedback>}
          </FormGroup>
          <FormGroup check>
            <Input 
              type="checkbox"
              id="terms"
              name="terms"
              onChange = {handleChange}
              checked={formData.terms}
              invalid={errors.terms}
              data-cy="terms"
            />
            
            <Label check for="terms">
              Kullanım koşullarını, gizlilik politikasını ve KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.
            </Label>
            {errors.terms && <FormFeedback data-cy="errorTerms">{errorMessages.terms}</FormFeedback>}
          </FormGroup>
          <Button disabled={!isValid} data-cy="submitButton">
          Kayıt ol
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

