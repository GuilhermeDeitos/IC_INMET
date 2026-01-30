import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { fadeInUp } from '../../../../shared/design-system/animations';
import { WeatherFilters, TableHeader } from '../../../../domain/weather/types';

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${theme.spacing[2]});
  right: 0;
  min-width: 160px;
  
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  
  overflow: hidden;
  z-index: 100;
  
  animation: ${fadeInUp} 150ms ease-out;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  text-align: left;
  
  background: transparent;
  border: none;
  cursor: pointer;
  
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.surface};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

const FileIcon = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  font-size: 10px;
  font-weight: 700;
  color: white;
  
  background: ${({ color }) => color};
  border-radius: ${theme.borderRadius.sm};
`;

interface ExportDropdownProps {
  data: TableHeader[];
  filters: WeatherFilters;
  onClose: () => void;
}

export function ExportDropdown({ data, filters, onClose }: ExportDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleExportExcel = async () => {
    // Importação dinâmica para code splitting
    const { ExcelExport } = await import('./exportArchive');
    const exporter = new ExcelExport(filters, data);
    exporter.onDowndloadExcel();
    onClose();
  };

  const handleExportCSV = async () => {
    const { CSVExport } = await import('./exportArchive');
    const exporter = new CSVExport(filters, data);
    exporter.onDowndloadCSV();
    onClose();
  };

  return (
    <Dropdown ref={ref}>
      <DropdownItem onClick={handleExportExcel}>
        <FileIcon color="#217346">XLS</FileIcon>
        Excel (.xlsx)
      </DropdownItem>
      <DropdownItem onClick={handleExportCSV}>
        <FileIcon color="#6366F1">CSV</FileIcon>
        CSV (.csv)
      </DropdownItem>
    </Dropdown>
  );
}