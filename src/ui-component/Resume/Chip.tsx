import { styled } from '@mui/material/styles';
import { default as MaterialChip } from '@mui/material/Chip';

const Chip = styled(MaterialChip)(({ theme }) => ({
    padding: theme.spacing(0),
    borderRadius: 3
}));

export default Chip;
