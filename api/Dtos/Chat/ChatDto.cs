namespace api.Dtos.Chat;

public record ChatRequest(List<MessageDto> Messages);

public record MessageDto(string Role, string Content);
