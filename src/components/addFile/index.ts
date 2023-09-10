import Block from '../../utils/block';
import template from './addFile.hbs';

type TProps = {
  text: string;
  file: boolean;
  error: boolean;
  accept: string;
  isShowText: boolean;
  onClick: () => void;
  addFileError: boolean;
  fileExtension: string[];
  setNewAvatar: (data: FormData) => void;
  events: {
    click: () => void;
  };
};

export class AddFile extends Block {
  private file: File | null = null;

  private formData: FormData;

  private readonly fileExtension: string[] = [];

  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.onClick(event),
        change: (event: Event) => this.onChange(event),
        submit: (event: Event) => this.setNewAvatar(event),
      },
    });
    this.fileExtension = props.fileExtension;
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  onChange(event: Event) {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const file = formData.getAll('avatar')[0] as File;
    const fileExtension = file?.name.split('.')[1] || '';

    if (file) {
      if (this.fileExtension.includes(fileExtension)) {
        this.file = file;
        this.formData = formData;
        this.setProps({
          file: true,
          fileName: file.name,
          addFileError: '',
          isShowText: '',
          addFileTypeError: '',
        });
      } else {
        this.file = null;
        this.setProps({
          addFileTypeError: true,
        });
      }
    }
  }

  setNewAvatar(event: Event) {
    event.preventDefault();
    if (this.file) {
      this.props.setNewAvatar(this.formData);
    } else {
      this.setProps({
        addFileError: true,
      });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
