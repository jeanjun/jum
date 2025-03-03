export const styles = <T>(
  element: HTMLElement,
  styles: { [key: string]: T }
): void => {
  for (const [property, value] of Object.entries(styles)) {
    // camelCase를 hyphen-case로 변환 (backgroundColor -> background-color)
    const cssProperty = property.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
    
    // 스타일 적용
    element.style[cssProperty as any] = String(value);
  }
}