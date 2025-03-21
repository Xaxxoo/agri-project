import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = React.ComponentProps<typeof Input>;

const SecureInput: React.FC<Props> = ({ ...rest }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <InputGroup>
            <Input {...rest} type={hidden ? 'password' : 'text'} pr="2rem" />
            <InputRightElement
                top={'50%'}
                transform={'translateY(-50%)'}
                paddingRight={'17px'}
                width="2rem"
            >
                <IconButton
                    variant={'ghost'}
                    onClick={() => setHidden((h) => !h)}
                    aria-label="Show password"
                >
                    {!hidden ? (
                        <svg
                            stroke="#969CA6"
                            fill="#969CA6"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="15px"
                            width="15px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <clipPath>
                                    <path
                                        fill="none"
                                        d="M124-288l388-672 388 672H124z"
                                        clipRule="evenodd"
                                    ></path>
                                </clipPath>
                            </defs>
                            <path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path>
                            <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path>
                        </svg>
                    ) : (
                        <svg
                            stroke="#969CA6"
                            fill="#969CA6"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="15px"
                            width="15px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path>
                        </svg>
                    )}
                </IconButton>
            </InputRightElement>
        </InputGroup>
    );
};

export default SecureInput;
