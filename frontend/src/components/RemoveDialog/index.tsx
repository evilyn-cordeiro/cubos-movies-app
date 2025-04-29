import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
import Close from "../Icons/Close";

interface RemoveDialogProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  movieTitle: string;
  handleDelete: () => void;
}

const RemoveDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  movieTitle,
  handleDelete,
}: RemoveDialogProps) => {
  const theme = useTheme();

  const handleClose = () => setDeleteDialogOpen(false);

  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        <Typography
          fontSize={"16px"}
          sx={{ color: theme.palette.text.primary }}
        >
          Confirmar Exclusão
        </Typography>
        <IconButton onClick={handleClose} aria-label="Fechar">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: theme.palette.text.primary }}>
          Tem certeza que deseja excluir
          <Typography
            fontWeight={800}
            sx={{ color: theme.palette.text.primary }}
          >
            {movieTitle}?
          </Typography>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
