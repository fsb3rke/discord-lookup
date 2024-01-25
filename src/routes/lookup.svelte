<script lang="ts">

    let username: string;
    let globalName: string;
    let avatarURL: string;
    let bannerURL: string;
    let hexAccentColor: string;
    let createdAt: string;
    let isBot: boolean;

    const showData = async () => {
        const inputDataValue: string = (<HTMLInputElement>document.getElementById("inp_id")).value;
        
        if (inputDataValue.length < 17) {
            return;
        }

        try {
            console.log(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            
            const response = await fetch(`http://localhost:2117/api/dclookup?id=${inputDataValue}`);
            const data = await response.json()

            console.log(data);
            
            username = data["username"];
            globalName = data["globalName"];
            avatarURL = data["avatarURL"];
            bannerURL = data["bannerURL"];
            hexAccentColor = data["hexAccentColor"];
            createdAt = data["createdAt"];
            isBot = data["isBot"];
        } catch (err) {
            console.error("Fetch Error:", err);
        }
        
    }


</script>

<div>
    <span>Account ID: </span>
    <input type="text" id="inp_id">

    <button id="btn_showData" on:click={() => showData()}>
        Show The Data
    </button>
    <br>
    <span>{username}</span><br>
    <span>{globalName}</span><br>
    <span style="background: {hexAccentColor}">{hexAccentColor}</span><br>
    <span>{createdAt}</span><br>
    <span>{isBot}</span><br>
    <img src="{avatarURL}" alt="">
    <img src="{bannerURL}" alt="">

</div>