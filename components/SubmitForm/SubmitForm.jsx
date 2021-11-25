import { useState } from "react";
import { styled } from "@stitches/react";
import { useTranslation } from "next-i18next";
import { Input } from "../Input";
import { Label } from "../Label";
// Or import the input component
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";

const Flex = styled("div", { display: "flex" });
const TextArea = styled("textarea", { height: "300px", width: "500px" });
const Button = styled("button", {
  display: "inline-block",
  padding: "0.3em 1.2em",
  margin: "0 0.3em 0.3em 0",
  borderRadius: "2em",
  boxSizing: " border-box",
  textDecoration: "none",
  fontFamily: "'Roboto, sans-serif",
  margin: "8px",
  fontWeight: "300",
  color: "#FFFFFF",
  backgroundColor: "#4eb5f1",
  textAlign: "center",
  transition: " all 0.2s",
});
const cssLabel = { lineHeight: "35px", marginRight: 15 };
const cssFlex = { padding: "0 20px", flexWrap: "wrap", alignItems: "center" };
const cssLayout = { flexDirection: "column", alignItems: "center" };

const initialState = {
  game_type: "National League",
  game_code: "C000",
  game_winner: "413",
  end_turn: 10,
  end_mode: "DEFCON",
  game_date: "2021-11-17T09:49:22",
  usa_player_id: "345",
  ussr_player_id: "413",
  video1: "http://www.brown.com/est-aut-aut-dicta-velit-possimus-expedita",
  video2: "http://russel.com/eos-occaecati-culpa-nulla-libero.html",
  video3: "http://www.kunde.com/ut-sunt-velit-hic-necessitatibus",
};

const bodyInfo = {
  game_type: "velit",
  game_code: "ratione",
  game_winner: "ipsa",
  end_turn: 14,
  end_mode: "necessitatibus",
  game_date: "2021-11-17T09:49:22",
  usa_player_id: "qui",
  ussr_player_id: "accusantium",
  video1: "http://www.brown.com/est-aut-aut-dicta-velit-possimus-expedita",
  video2: "http://russel.com/eos-occaecati-culpa-nulla-libero.html",
  video3: "http://www.kunde.com/ut-sunt-velit-hic-necessitatibus",
};

const TextComponent = ({
  labelText,
  inputValue,
  onInputValueChange = () => {},
  ...rest
}) => (
  <Flex css={cssFlex}>
    <Label htmlFor="video1" css={cssLabel}>
      {labelText}
    </Label>
    <Input
      type="text"
      id="video1"
      defaultValue={inputValue}
      onChange={(event) => onInputValueChange(event.target.value)} //(event) => console.log("inside input", event.target.value)}
      {...rest}
    />
  </Flex>
);

const DisplayData = ({ data, labelText }) => {
  return (
    <Flex css={cssLayout}>
      <Label htmlFor="send" css={cssLabel}>
        {labelText}
      </Label>
      <TextArea
        name="send"
        value={JSON.stringify(data, undefined, 2)}
        readonly
      ></TextArea>
    </Flex>
  );
};

const callAPI = ({ url, data, sendCallback, responseCallback }) => {
  sendCallback(data);
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => responseCallback(result))
    .catch((err) => responseCallback(err));
};

const SubmitForm = () => {
  const [form, setForm] = useState(initialState);
  const [date, setDate] = useState(new Date());
  const [sendInfo, setSendInfo] = useState("");
  const [responseInfo, setResponseInfo] = useState("");
  const [url, setUrl] = useState("https://tsalpha.klckh.com/api/game-results");
  const { t} = useTranslation('submit');

  const onInputValueChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <Flex css={cssLayout}>
        <DayPickerInput
          css={{ backgroundColor: "red" }}
          dayPickerProps={{
            month: new Date(2018, 10),
            showWeekNumbers: true,
            todayButton: "Today",
          }}
        />
        <TextComponent
          labelText={t('currentURL')}
          inputValue={url}
          onInputValueChange={(event) => setUrl(event.target.value)}
          margin="xxl"
        />
        <TextComponent
          labelText={t('typeOfGame')}
          inputValue={form.game_type}
          onInputValueChange={(value) => onInputValueChange("game_type", value)}
        />
        <TextComponent
          labelText={t('checkID')}
          inputValue={form.game_code}
          onInputValueChange={(value) => onInputValueChange("game_code", value)}
        />
        <TextComponent
          labelText={t('playerUSA')}
          inputValue={form.usa_player_id}
          onInputValueChange={(value) =>
            onInputValueChange("usa_player_id", value)
          }
        />
        <TextComponent
          labelText={t('playerURSS')}
          inputValue={form.ussr_player_id}
          onInputValueChange={(value) =>
            onInputValueChange("ussr_player_id", value)
          }
        />
        <TextComponent
          labelText={t('gameWinner')}
          inputValue={form.game_winner}
          onInputValueChange={(value) =>
            onInputValueChange("game_winner", value)
          }
        />
        <TextComponent
          labelText={t('endTurn')}
          inputValue={form.end_turn}
          onInputValueChange={(value) => onInputValueChange("end_turn", value)}
        />
        <TextComponent
          labelText={t('endType')}
          inputValue={form.end_mode}
          onInputValueChange={(value) => onInputValueChange("end_mode", value)}
        />
        <TextComponent
          labelText={t('gameDate')}
          inputValue={form.game_date}
          onInputValueChange={(value) => onInputValueChange("game_date", value)}
        />
        <TextComponent
          labelText={t('videoLink1')}
          inputValue={form.video1}
          onInputValueChange={(value) => onInputValueChange("video1", value)}
        />
        <TextComponent
          labelText={t('videoLink2')}
          inputValue={form.video2}
          onInputValueChange={(value) => onInputValueChange("video2", value)}
        />
        <TextComponent
          labelText={t('videoLink3')}
          inputValue={form.video3}
          onInputValueChange={(value) => onInputValueChange("video3", value)}
        />
        <Button
          onClick={() =>
            callAPI({
              url,
              data: form,
              sendCallback: setSendInfo,
              responseCallback: setResponseInfo,
            })
          }
        >
          Call submit API
        </Button>
      </Flex>
      <Flex>
        <DisplayData labelText="Send" data={sendInfo} />
        <DisplayData labelText="Response" data={responseInfo} />
      </Flex>
    </>
  );
};
export { SubmitForm };
