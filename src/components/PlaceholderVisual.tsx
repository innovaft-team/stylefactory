import { Box, Text } from "@chakra-ui/react";

export function PlaceholderVisual({
  label,
  className,
  minH,
}: {
  label: string;
  className: string;
  minH?: any;
}) {
  return (
    <Box
      className={`relative overflow-hidden rounded-lg bg-[#f7f7f4] [box-shadow:inset_0_0_0_1px_rgba(0,0,0,0.06)] ${className}`}
      minH={minH}
    >
      <Text className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.24)] text-[11px] font-medium uppercase tracking-[0.06em] whitespace-nowrap">
        {label}
      </Text>
    </Box>
  );
}
