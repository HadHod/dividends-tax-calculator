export function ChooseBroker({ onNewBroker }: { onNewBroker: any }) {
  return (
    <div>
      <p>Choose broker</p>

      <div>
        <input type="radio" id="degiro" name="broker" value="degiro" onChange={e => onNewBroker(e.target.value)} />
        <label htmlFor="degiro">degiro</label>
      </div>

      <div>
        <input type="radio" id="lynx" name="broker" value="lynx" onChange={e => onNewBroker(e.target.value)} />
        <label htmlFor="lynx">lynx</label>
      </div>
    </div>
  )
}