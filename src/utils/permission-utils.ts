import { GuildMember, PermissionResolvable } from 'discord.js';

/**
 * Utility class for handling permissions and roles in Discord.js
 */
class PermissionUtils {
	/**
	 * Check if a user has a specific permission
	 * @param {GuildMember} user - The user to check permissions for.
	 * @param {PermissionResolvable} permission - The permission to check for.
	 * @returns {boolean} Whether the user has the specified permission.
	 */
	public hasPermission(user: GuildMember, permission: PermissionResolvable): boolean {
		return user.permissions.has(permission);
	}

	/**
	 * Checks if a user has a specific role
	 * @param {GuildMember} user - The user to check roles for.
	 * @param {string} role - The role to check for.
	 * @returns {boolean} Whether the user has the specified role.
	 */
	public hasRole(user: GuildMember, role: string): boolean {
		return user.roles.cache.has(role);
	}

	/**
	 * Checks if a user has a specific permission in a channel.
	 * @param {GuildMember} user - The user to check permissions for.
	 * @param {string} channel - The channel to check permissions in.
	 * @param {PermissionResolvable} permission - The permission to check for.
	 * @returns {boolean} Whether the user has the specified permission in the channel.
	 */
	public hasChannelPermission(user: any, channel: string, permission: string): boolean {
		return user.permissionsIn(channel).has(permission);
	}

	/**
	 * Gets the localized name of a Discord permission.
	 * @param {string} permission - The permission to localize.
	 * @returns {string} The localized name of the permission.
	 */
	public getPermissionName(permission: string): string {
		const permissionLocalizations = {
			AddReactions: 'Reaktionen hinzufügen',
			Administrator: 'Administrator',
			AttachFiles: 'Dateien anhängen',
			BanMembers: 'Mitglieder bannen',
			ChangeNickname: 'Nickname ändern',
			Connect: 'Verbinden',
			CreateEvents: 'Events erstellen',
			CreateGuildExpressions: 'Ausdrücke erstellen',
			CreateInstantInvite: 'Einladung erstellen',
			CreatePrivateThreads: 'Private Threads erstellen',
			CreatePublicThreads: 'Öffentliche Threads erstellen',
			DeafenMembers: 'Ein- und Ausgabe von Mitgliedern deaktivieren',
			EmbedLinks: 'Links einbetten',
			KickMembers: 'Mitglieder kicken',
			ManageChannels: 'Kanäle verwalten',
			ManageEmojisAndStickers: 'Ausdrücke verwalten',
			ManageEvents: 'Events verwalten',
			ManageGuild: 'Server verwalten',
			ManageGuildExpressions: 'Ausdrücke verwalten',
			ManageMessages: 'Nachrichten verwalten',
			ManageNicknames: 'Nicknames verwalten',
			ManageRoles: 'Rollen verwalten',
			ManageThreads: 'Threads verwalten',
			ManageWebhooks: 'Webhooks verwalten',
			MentionEveryone: 'Erwähne @everyone, @here und „Alle Rollen“',
			ModerateMembers: 'Mitglieder im Timeout',
			MoveMembers: 'Mitglieder verschieben',
			MuteMembers: 'Mitglieder stummschalten',
			PrioritySpeaker: 'Very Important Speaker',
			ReadMessageHistory: 'Nachrichtenverlauf anzeigen',
			RequestToSpeak: 'Redeanfrage',
			SendMessages: 'Nachrichten senden',
			SendMessagesInThreads: 'Nachrichten in Threads senden',
			SendPolls: 'Umfragen erstellen',
			SendTTSMessages: 'Text-zu-Sprache-Nachrichten senden',
			SendVoiceMessages: 'Sprachnachrichten senden',
			Speak: 'Sprechen',
			Stream: 'Streamen',
			UseApplicationCommands: 'Anwendungsbefehle verwenden',
			UseEmbeddedActivities: 'Aktivitäten nutzen',
			UseExternalEmojis: 'Externe Emojis verwenden',
			UseExternalSounds: 'Externe Sounds verwenden',
			UseExternalStickers: 'Externe Sticker verwenden',
			UseSoundboard: 'Soundboard verwenden',
			UseVAD: 'Sprachaktivierung verwenden',
			ViewAuditLog: 'Audit-Log einsehen',
			ViewChannel: 'Kanäle ansehen',
			ViewCreatorMonetizationAnalytics: 'Monetarisierungsanalysen einsehen',
			ViewGuildInsights: 'Server-Insights einsehen',
		};

		// Return localized permission name
		return permissionLocalizations[permission];
	}
}

export { PermissionUtils };
