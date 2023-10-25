import { render, screen, } from '@testing-library/react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';



jest.mock('react-redux');
describe('Header 컴포넌트가 올바르게 렌더링되는지 확인합니다', () => {
  it.skip('renders the Header component correctly', () => {


    render(<Header />);
    const amountInput = screen.getByText('문제 수');
    const categorySelect = screen.getByText('카테고리');
    const difficultySelect = screen.getByText('난이도');
    const quizStartButton = screen.getByText('퀴즈 시작');

    expect(amountInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
    expect(difficultySelect).toBeInTheDocument();
    expect(quizStartButton).toBeInTheDocument();
  });

  it('“퀴즈 시작” 버튼을 클릭할 때 원하는 값을 dispatch합니다.', async () => {

    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);


    (useSelector as jest.Mock).mockReturnValue({
      quiz: {
        selectedQuiz: { id: -2 },
        addQuizLoading: false,
      }
    });

    render(<Header />);


    const openModalButton = screen.getByText('퀴즈 시작');
    await userEvent.click(openModalButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_QUIZ_REQUEST',
      payload: {
        amount: '10',
        category: 'any',
        difficulty: 'any',
      },
    });


  });

});