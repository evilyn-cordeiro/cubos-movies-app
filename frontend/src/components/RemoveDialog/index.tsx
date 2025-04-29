import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

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
  return (
    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir <strong>{movieTitle}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
        <Button onClick={handleDelete} color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
