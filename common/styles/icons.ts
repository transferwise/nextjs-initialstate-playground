export enum IconType {
  Atm = 'atm',
  BriefCase = 'briefcase',
  CardFront = 'card-front',
  FastFlag = 'fast-flag',
  Globe = 'globe',
  MultiCurrency = 'multi-currency',
  Transfer = 'transfer',
  Star = 'star',
}

export enum IconSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
  ExtraExtraLarge = 'xxl',
}

export function stringToIcon(icon: string): IconType {
  switch (icon) {
    case 'atm':
      return IconType.Atm;
    case 'brief-case':
      return IconType.BriefCase;
    case 'card-front':
      return IconType.CardFront;
    case 'fast-flag':
      return IconType.FastFlag;
    case 'globe':
      return IconType.Globe;
    case 'multi-currency':
      return IconType.MultiCurrency;
    case 'transfer':
      return IconType.Transfer;
    default:
      return IconType.FastFlag;
  }
}
