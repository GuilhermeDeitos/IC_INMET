import { useState, useRef, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../design-system';
import { fadeInUp } from '../../design-system/animations';
import { MapPinIcon } from '../Icons';

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div<{ isFocused: boolean; hasValue: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  
  background: ${theme.colors.surfaceHover};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut};
  
  ${({ isFocused }) => isFocused && css`
    background: ${theme.colors.background};
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  `}
  
  &:hover:not(:focus-within) {
    background: ${theme.colors.surface};
    border-color: ${theme.colors.border};
  }
`;

const IconWrapper = styled.span`
  display: flex;
  color: ${theme.colors.text.muted};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.primary};
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  
  background: ${theme.colors.surface};
  border: none;
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.text.muted};
  cursor: pointer;
  
  font-size: 12px;
  line-height: 1;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.border};
    color: ${theme.colors.text.primary};
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + ${theme.spacing[2]});
  left: 0;
  right: 0;
  max-height: 280px;
  overflow-y: auto;
  
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  
  z-index: 100;
  
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-8px')});
  
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut};
  
  animation: ${({ isOpen }) => isOpen && css`${fadeInUp} 150ms ease-out`};
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
  }
`;

const DropdownItem = styled.button<{ isHighlighted: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  text-align: left;
  
  background: ${({ isHighlighted }) => 
    isHighlighted ? theme.colors.primaryLight : 'transparent'};
  border: none;
  cursor: pointer;
  
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.surface};
  }
  
  ${({ isHighlighted }) => isHighlighted && css`
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  `}
`;

const ItemCode = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  font-family: ${theme.typography.fontFamily.mono};
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemState = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  padding: 2px 6px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.sm};
`;

const NoResults = styled.div`
  padding: ${theme.spacing[4]};
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSize.sm};
`;

// Types
export interface AutocompleteOption {
  value: string;
  label: string;
  state?: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Component
export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = 'Buscar estação...',
  disabled = false,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get selected option label
  const selectedOption = options.find(opt => opt.value === value);
  
  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    
    const searchLower = search.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchLower) ||
      opt.value.toLowerCase().includes(searchLower)
    );
  }, [options, search]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions.length]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(i => 
          i < filteredOptions.length - 1 ? i + 1 : i
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(i => (i > 0 ? i - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearch('');
        break;
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearch('');
    inputRef.current?.blur();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const displayValue = isOpen ? search : (selectedOption?.label || '');

  return (
    <Container ref={containerRef}>
      <InputWrapper 
        isFocused={isOpen} 
        hasValue={!!value}
        onClick={() => inputRef.current?.focus()}
      >
        <IconWrapper>
          <MapPinIcon size={18} />
        </IconWrapper>
        
        <Input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
        />
        
        {value && !isOpen && (
          <ClearButton onClick={handleClear} type="button">
            ✕
          </ClearButton>
        )}
      </InputWrapper>

      <Dropdown isOpen={isOpen && !disabled}>
        {filteredOptions.length === 0 ? (
          <NoResults>Nenhuma estação encontrada</NoResults>
        ) : (
          filteredOptions.map((option, index) => (
            <DropdownItem
              key={option.value}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              type="button"
            >
              <ItemCode>{option.value}</ItemCode>
              <ItemName>{option.label}</ItemName>
              {option.state && <ItemState>{option.state}</ItemState>}
            </DropdownItem>
          ))
        )}
      </Dropdown>
    </Container>
  );
}