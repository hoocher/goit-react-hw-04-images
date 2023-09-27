import { DButton, DivContainer } from 'components/Button/Button.styled';

const Button = ({ onClick }) => {
  return (
    <DivContainer>
      <DButton type="button" onClick={onClick}>
        Load more
      </DButton>
    </DivContainer>
  );
};
export default Button;
