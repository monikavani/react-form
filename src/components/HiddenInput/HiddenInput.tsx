type Props = { value: any };
export const HiddenInput = ({ value }: Props) => (
    <div>
        <input type="hidden" value={value} />
    </div>
)