type NotesCellProps = {
  row: any;
};

export default function NotesCell({ row }: NotesCellProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {row.notes}
    </div>
  );
}
