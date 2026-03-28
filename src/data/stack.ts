export interface StackItem {
  icon: string;
  name: string;
  role: string;
}

export const stack: StackItem[] = [
  { icon: '🎭', name: 'Playwright',     role: 'E2E Automation' },
  { icon: '📘', name: 'TypeScript',     role: 'Primary Language' },
  { icon: '🤖', name: 'Claude AI',      role: 'AI Test Assistant' },
  { icon: '🐙', name: 'GitHub Actions', role: 'CI / CD Pipelines' },
  { icon: '📊', name: 'Allure',         role: 'Test Reporting' },
  { icon: '🐳', name: 'Docker',         role: 'Test Environments' },
  { icon: '🔥', name: 'k6',            role: 'Performance Testing' },
  { icon: '🔬', name: 'Jest',           role: 'Unit Testing' },
  { icon: '📡', name: 'Postman',        role: 'API Testing' },
  { icon: '📈', name: 'Grafana',        role: 'Observability' },
  { icon: '🧩', name: 'Jira',           role: 'Test Management' },
  { icon: '💻', name: 'VS Code',        role: 'Editor' },
];
