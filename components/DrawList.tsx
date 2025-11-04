'use client';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NumberBall from './NumberBall';
import type { DrawRow } from '@/app/actions';

export default function DrawList({
                                   draws,
                                   selectedId,
                                   onSelect,
                                   checkedIds,
                                   onToggleCheck,
                                   onDeleteOne,
                                   ballSize,
                                 }: {
  draws: DrawRow[];
  selectedId?: string | null;
  onSelect: (r: DrawRow) => void;
  checkedIds: Set<string>;
  onToggleCheck: (id: string) => void;
  onDeleteOne: (id: string) => void;
  ballSize: number;
}) {
  return (
      <List dense sx={{ width: '100%', maxHeight: '70vh', overflowY: 'auto' }}>
        {draws.map((d) => (
            <ListItem
                key={d.id}
                disablePadding
                secondaryAction={
                  <Tooltip title="이 항목 삭제">
                    <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOne(d.id);
                        }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                sx={{ overflowX: 'hidden' }}
            >
              <ListItemButton
                  selected={selectedId === d.id}
                  onClick={() => onSelect(d)}
              >
                <ListItemIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCheck(d.id);
                    }}
                    sx={{ minWidth: 40 }}
                >
                  <Checkbox
                      edge="start"
                      checked={checkedIds.has(d.id)}
                      tabIndex={-1}
                      disableRipple
                  />
                </ListItemIcon>

                <ListItemText
                    primary={
                      <Stack
                          direction="row"
                          alignItems="center"
                          sx={{
                            flexWrap: 'nowrap',
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                          }}
                      >
                        {d.numbers.map((n) => (
                            <NumberBall key={n} n={n} size={ballSize} mr={0.5} />
                        ))}
                      </Stack>
                    }
                    secondary={new Date(d.created_at).toLocaleString()}
                />
              </ListItemButton>
            </ListItem>
        ))}
      </List>
  );
}
