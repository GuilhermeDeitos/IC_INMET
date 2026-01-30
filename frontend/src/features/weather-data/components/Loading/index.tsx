import styled, { keyframes } from 'styled-components';
import { theme } from '../../../../shared/design-system';

const progressAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  background: ${theme.colors.surface};
  overflow: hidden;
  border-radius: ${theme.borderRadius.full};
`;

const Bar = styled.div`
  position: absolute;
  width: 25%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    ${theme.colors.primary}, 
    ${theme.colors.primaryHover}
  );
  border-radius: ${theme.borderRadius.full};
  animation: ${progressAnimation} 1.5s ease-in-out infinite;
`;

export function ProgressBar() {
  return (
    <Container>
      <Bar />
    </Container>
  );
}

// Skeleton para tabela
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.colors.surface} 0%,
    ${theme.colors.surfaceHover} 50%,
    ${theme.colors.surface} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${theme.borderRadius.md};
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const SkeletonCell = styled(SkeletonBase)<{ width?: string }>`
  height: 20px;
  width: ${({ width }) => width || '100px'};
`;

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i}>
          <SkeletonCell width="150px" />
          <SkeletonCell width="60px" />
          <SkeletonCell width="100px" />
          <SkeletonCell width="80px" />
          <SkeletonCell width="80px" />
          <SkeletonCell width="70px" />
          <SkeletonCell width="70px" />
          <SkeletonCell width="70px" />
        </SkeletonRow>
      ))}
    </div>
  );
}