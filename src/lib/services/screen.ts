export function getCurrentBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const breakpointSM: 'sm' | null = document.getElementById('breakpoint-sm')?.offsetParent === null ? null : 'sm';
  const breakpointMD: 'md' | null = document.getElementById('breakpoint-md')?.offsetParent === null ? null : 'md';
  const breakpointLG: 'lg' | null = document.getElementById('breakpoint-lg')?.offsetParent === null ? null : 'lg';
  const breakpointXL: 'xl' | null = document.getElementById('breakpoint-xl')?.offsetParent === null ? null : 'xl';
  const breakpoint2XL: '2xl' | null = document.getElementById('breakpoint-2xl')?.offsetParent === null ? null : '2xl';
  const breakpoint = breakpointSM ?? breakpointMD ?? breakpointLG ?? breakpointXL ?? breakpoint2XL ?? 'xs';
  return breakpoint;
}
